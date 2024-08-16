resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  tags = {
    Name        = local.vpc_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
  }
}

resource "aws_subnet" "subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 1)
  map_public_ip_on_launch = true
  availability_zone       = var.availability_zones[0]
  depends_on = [aws_vpc.main]
  tags = {
    Name        = local.subnet_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
  }
}

resource "aws_subnet" "subnet2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 2)
  map_public_ip_on_launch = true
  availability_zone       = var.availability_zones[1]
  depends_on = [aws_vpc.main]
  tags = {
    Name        = local.subnet2_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.main.id
  depends_on = [aws_subnet.subnet, aws_subnet.subnet2]
  tags = {
    Name        = local.internet_gateway_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
  }
}

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
  depends_on = [aws_internet_gateway.internet_gateway]
  tags = {
    Name        = local.route_table_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
  }
}

resource "aws_route_table_association" "subnet_route" {
  subnet_id      = aws_subnet.subnet.id
  route_table_id = aws_route_table.route_table.id
  depends_on = [aws_route_table.route_table]
}

resource "aws_route_table_association" "subnet2_route" {
  subnet_id      = aws_subnet.subnet2.id
  route_table_id = aws_route_table.route_table.id
  depends_on = [aws_route_table.route_table]
}

resource "aws_security_group" "security_group" {
  name   = local.security_group_name
  vpc_id = aws_vpc.main.id
  depends_on = [aws_vpc.main]

  ingress {
   from_port   = 0
   to_port     = 0
   protocol    = -1
   self        = "false"
   cidr_blocks = ["0.0.0.0/0"]
   description = "any"
 }

 egress {
   from_port   = 0
   to_port     = 0
   protocol    = "-1"
   cidr_blocks = ["0.0.0.0/0"]
 }

  tags = {
    Name        = local.security_group_name
    Environment = var.environment
    Project     = var.project_name
    Owner       = var.owner
  }
}