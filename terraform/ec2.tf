resource "aws_launch_template" "ecs_lt" {
  name_prefix   = "ecs-template"
  image_id      = "ami-06e58c02ae8aabac6"
  instance_type = "t4g.medium"

  key_name               = "cascarita"
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
      Environment = "staging"
      Project     = "cascarita"
      Owner       = "abanuelo"
      Role        = "ECSWorkerNode"
      Purpose     = "AutoScalingGroup"
    }
  }


    user_data = base64encode(file("ecs.sh"))
}

resource "aws_autoscaling_group" "ecs_asg" {
  vpc_zone_identifier = [aws_subnet.subnet.id, aws_subnet.subnet2.id]
  desired_capacity    = 2
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
    Environment = "staging"
    Project     = "cascarita"
    Owner       = "abanuelo"
    Role        = "ECSLoadBalancer"
    Purpose     = "TrafficDistribution"
  }
}

resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 3000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }

  tags = {
    Name        = "ecs-alb-listener"
    Environment = "staging"
    Project     = "cascarita"
    Owner       = "abanuelo"
    Role        = "ECSLoadBalancerListener"
    Purpose     = "RequestRouting"
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = "ecs-target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    path = "/"
  }

  tags = {
    Name        = "ecs-target-group"
    Environment = "staging"
    Project     = "cascarita"
    Owner       = "abanuelo"
    Role        = "ECSTargetGroup"
    Purpose     = "LoadBalancing"
  }
}