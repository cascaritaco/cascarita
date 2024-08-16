variable "name_prefix" {
  description = "Prefix for the name of the AWS launch template."
  default     = "ecs-template"
}

variable "image_id" {
  description = "The ID of the AMI to use for the instance."
  default     = "ami-06e58c02ae8aabac6"
}

variable "instance_type" {
  description = "The type of instance to start, e.g., t4g.medium."
  default     = "t4g.medium"
}

variable "key_name" {
  description = "The name of the key pair to use for the instance."
  default     = "cascarita"
}

variable "environment" {
  description = "The environment for which these resources are created, e.g., staging or production."
  default     = "staging"
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
  description = "The port exposed load balancer, target group, and server container."
  default     = 3001
}

variable "cluster_name" {
  description = "The name of the ECS cluster."
  default     = "staging-ecs-cluster"
}

variable "capacity_provider_name" {
  description = "The name of the ECS capacity provider."
  default     = "capacity"
}

variable "task_family_name" {
  description = "The family name for the ECS task."
  default     = "my-ecs-task"
}

variable "container_name" {
  description = "The name of the container in the task definition."
  default     = "dockergs"
}

variable "container_image" {
  description = "The container image to be used in the task definition."
  default     = "public.ecr.aws/z2w9v6e7/cascarita-server"
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

variable "vpc_name" {
  description = "The name of the VPC."
  default     = "main-vpc"
}

variable "subnet_name" {
  description = "The name of the first subnet."
  default     = "main-subnet-1"
}

variable "subnet2_name" {
  description = "The name of the second subnet."
  default     = "main-subnet-2"
}

variable "internet_gateway_name" {
  description = "The name of the internet gateway."
  default     = "main-internet-gateway"
}

variable "route_table_name" {
  description = "The name of the route table."
  default     = "main-route-table"
}

variable "security_group_name" {
  description = "The name of the security group."
  default     = "ecs-security-group"
}

variable "availability_zones" {
  description = "List of availability zones for the subnets."
  type        = list(string)
  default     = ["us-west-1a", "us-west-1b"]
}

variable "ingress_cidr_blocks" {
  description = "CIDR blocks for ingress rules."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "egress_cidr_blocks" {
  description = "CIDR blocks for egress rules."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "protocol" {
  description = "Protocol for ingress and egress rules."
  default     = "-1" # -1 means all protocols
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}