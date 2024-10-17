variable "aws_region" {
  description = "value for aws_region"
  default     = "us-west-1"
}
# NOTE: Change this variable to target different infra either prod/staging
# Remember to update the `ecs.sh` with the right environment as well
variable "environment" {
  description = "The environment for which these resources are created, e.g., staging or production."
  default     = "staging"
}

variable "policy_arn" {
  description = "The policy arn associated with adding EC2 instances to ECS cluster."
  default     = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

variable "task_policy_arn" {
  description = "The policy arn associated with AmazonECSTaskExecutionRolePolicy"
  default     = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

variable "instance_policy_name" {
  description = "The instance policy name associated with role for adding EC2 instances to ECS cluster."
  default     = "ecsInstanceProfile"
}

variable "image_id" {
  description = "The ID of the AMI to use for the instance."
  default     = "ami-0211752aa919a35bf"
}

variable "instance_type" {
  description = "The type of instance to start, e.g., t4g.small."
  default     = "t4g.small"
}

variable "key_name" {
  description = "The name of the key pair to use for the instance."
  default     = "cascarita"
}

variable "project_name" {
  description = "The name of the project these resources are associated with."
  default     = "cascarita"
}

variable "owner" {
  description = "The owner of the resources, typically the responsible person or team."
  default     = "abanuelo"
}

variable "role_instance" {
  description = "The role of the instance in the ECS architecture, e.g., ECSWorkerNode."
  default     = "ECSWorkerNode"
}

variable "purpose_instance" {
  description = "The purpose of the instance, e.g., AutoScalingGroup."
  default     = "AutoScalingGroup"
}

variable "role_lb" {
  description = "The role of the load balancer, e.g., ECSLoadBalancer."
  default     = "ECSLoadBalancer"
}

variable "purpose_lb" {
  description = "The purpose of the load balancer, e.g., TrafficDistribution."
  default     = "TrafficDistribution"
}

variable "role_listener" {
  description = "The role of the load balancer listener, e.g., ECSLoadBalancerListener."
  default     = "ECSLoadBalancerListener"
}

variable "purpose_listener" {
  description = "The purpose of the load balancer listener, e.g., RequestRouting."
  default     = "RequestRouting"
}

variable "role_tg" {
  description = "The role of the target group, e.g., ECSTargetGroup."
  default     = "ECSTargetGroup"
}

variable "purpose_tg" {
  description = "The purpose of the target group, e.g., LoadBalancing."
  default     = "LoadBalancing"
}

variable "port" {
  description = "The port exposed load balancer, target group, and container."
  default     = 80
}

variable "container_name" {
  description = "The name of the container in the task definition."
  default     = "casc-server"
}

variable "container_image" {
  description = "The container image to be used in the task definition."
  default     = "public.ecr.aws/nginx/nginx:latest"
}

variable "cpu_allocation" {
  description = "The amount of CPU units to allocate for the task and container."
  default     = 256
}

variable "memory_allocation" {
  description = "The amount of memory in MB to allocate for the container."
  default     = 512
}

variable "desired_count" {
  description = "The desired number of tasks in the ECS service."
  default     = 1
}

variable "target_capacity" {
  description = "The target capacity for the auto-scaling group provider."
  default     = 3
}

variable "availability_zones" {
  description = "List of availability zones for the subnets."
  type        = list(string)
  default     = ["us-west-1a", "us-west-1b"]
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.1.0.0/16"
}

/*
    LOCAL VARIABLES THAT REFERENCE DEPLOYED ENVIRONMENT
*/
locals {
  cluster_name = "ecs-${var.environment}-cluster"
}
locals {
  service_name = "ecs-${var.environment}-service"
}
locals {
  instance_name = "ecs-${var.environment}-instance"
}
locals {
  alb_lb_target_group_name = "ecs-${var.environment}-target-group"
}
locals {
  alb_name = "ecs-${var.environment}-alb"
}
locals {
  alb_listener_name = "ecs-${var.environment}-alb-listener"
}
locals {
  name_prefix = "ecs-${var.environment}-template"
}
// NOTE: cannot be prefixed with "aws", "ecs", or "fargate"
locals {
  capacity_provider_name = "${var.environment}-capacity"
}
locals {
  task_family_name = "ecs-${var.environment}-task"
}
locals {
  security_group_name = "ecs-${var.environment}-security-group"
}
locals {
  vpc_name = "${var.environment}-vpc"
}
locals {
  subnet_name = "${var.environment}-subnet-1"
}
locals {
  subnet2_name = "${var.environment}-subnet-2"
}
locals {
  internet_gateway_name = "${var.environment}-internet-gateway"
}
locals {
  route_table_name = "${var.environment}-route-table"
}