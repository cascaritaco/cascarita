resource "aws_launch_template" "ecs_lt" {
  name_prefix   = var.name_prefix
  image_id      = var.image_id
  instance_type = var.instance_type

  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.security_group.id]

  iam_instance_profile {
    name = "ecsInstanceRole"
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 30
      volume_type = "gp2"
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name        = "ecs-staging-instance"
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
  vpc_zone_identifier = [aws_subnet.subnet.id, aws_subnet.subnet2.id]
  desired_capacity    = 1
  max_size            = 3
  min_size            = 1

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = [aws_subnet.subnet.id, aws_subnet.subnet2.id]

  tags = {
    Name        = "ecs-alb"
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
    Name        = "ecs-alb-listener"
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
    Role        = var.role_listener
    Purpose     = var.purpose_listener
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = "ecs-target-group"
  port        = var.port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    path = "/"
  }

  tags = {
    Name        = "ecs-target-group"
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
    Role        = var.role_tg
    Purpose     = var.purpose_tg
  }
}