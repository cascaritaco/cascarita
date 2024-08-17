resource "aws_iam_role" "ecs_instance_role" {
  name = "ecsInstanceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance_role_attachment" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = var.policy_arn
}

resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = var.instance_policy_name
  role = aws_iam_role.ecs_instance_role.name
}

resource "aws_launch_template" "ecs_lt" {
  name_prefix   = local.name_prefix
  image_id      = var.image_id
  instance_type = var.instance_type

  key_name               = var.key_name

  iam_instance_profile {
    name = aws_iam_instance_profile.ecs_instance_profile.name
  }

  network_interfaces {
    associate_public_ip_address = true
    subnet_id                   = aws_subnet.subnet.id
    security_groups             = [aws_security_group.security_group.id]
    delete_on_termination       = true
  }

  block_device_mappings {
    device_name = "/dev/sdf"

    ebs {
      volume_size = 20
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name        = local.instance_name
      Environment = var.environment
      Project     = var.project_name
      Owner       = var.owner
      Role        = var.role_instance
      Purpose     = var.purpose_instance
    }
  }

  user_data = filebase64("${path.module}/ecs.sh")
}

resource "aws_autoscaling_group" "ecs_asg" {
  desired_capacity    = var.desired_count
  max_size            = var.target_capacity
  min_size            = var.desired_count

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  vpc_zone_identifier = [aws_subnet.subnet.id, aws_subnet.subnet2.id]

  depends_on = [aws_lb.ecs_alb]

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

resource "aws_lb" "ecs_alb" {
  name               = local.alb_name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = [aws_subnet.subnet.id, aws_subnet.subnet2.id]

  tags = {
    Name        = local.alb_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
    Role        = var.role_lb
    Purpose     = var.purpose_lb
  }
}

resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = var.port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }

  tags = {
    Name        = local.alb_listener_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
    Role        = var.role_listener
    Purpose     = var.purpose_listener
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = local.alb_lb_target_group_name
  port        = var.port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    path = "/"
  }

  tags = {
    Name        = local.alb_lb_target_group_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
    Role        = var.role_tg
    Purpose     = var.purpose_tg
  }
}