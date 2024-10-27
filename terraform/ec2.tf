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

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# resource "aws_iam_policy" "ecr_pull_policy" {
#   name        = "ECRPullPolicy"
#   description = "Allows ECS tasks to pull images from ECR"
#   policy      = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect   = "Allow"
#         Action   = [
#           "ecr:GetDownloadUrlForLayer",
#           "ecr:BatchGetImage",
#           "ecr:BatchCheckLayerAvailability"
#         ]
#         Resource = "arn:aws:ecr:us-west-1:658488939163:repository/cascarita-server"
#       },
#       {
#         Effect   = "Allow"
#         Action   = "ecr:GetAuthorizationToken"
#         Resource = "*"
#       }
#     ]
#   })
# }

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# resource "aws_iam_role_policy_attachment" "ecs_ecr_pull_policy_attachment" {
#   role       = aws_iam_role.ecs_task_execution_role.name
#   policy_arn = aws_iam_policy.ecr_pull_policy.arn
# }

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

  depends_on = [aws_iam_instance_profile.ecs_instance_profile]

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

  depends_on = [aws_lb.ecs_alb,
    aws_internet_gateway.internet_gateway
  ]

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}
