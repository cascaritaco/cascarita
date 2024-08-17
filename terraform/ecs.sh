#!/bin/bash
sudo mkdir /etc/ecs
sudo touch /etc/ecs/ecs.config
echo "ECS_CLUSTER=ecs-staging-cluster" >> /etc/ecs/ecs.config