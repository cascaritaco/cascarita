#!/bin/bash
sudo mkdir /etc/ecs
sudo touch /etc/ecs/ecs.config
echo "ECS_CLUSTER=staging-ecs-cluster" >> /etc/ecs/ecs.config