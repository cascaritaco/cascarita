# Terraform - Infrastructure As Code

## Prerequisites

1. Make sure that you have set on your local machine your `~/.aws/config` and `~/.aws/credentials` to have the default profile use your access keys to be able to deploy to AWS:

   example `~/.aws/credentials`

   ```
   [default]
   aws_access_key_id = ACCESS_KEY
   aws_secret_access_key = SECRET_ACCESS_KEY
   ```

   example `~/.aws/config`

   ```
   [profile default]
    region = us-west-1
    output = json
   ```

   **NOTE: Try to configure your account `~/.aws/config` with the same region you plan on using in your deployment step [here](#creating-resources).**

## Creating Resources

1. Make sure the right `environment` (ie. staging, production) is specified within the `vars.tf`.

   **NOTE: Ensure that same environment is present within the export command in the `ecs.sh` script**

2. Make sure you have the right deployment region as specified by the `availability_zones` variable in `vars.tf`.

3. Install terraform CLI:

   ```
    brew install terraform
   ```

4. As part of initialization navigate to the `terraform` directory and run:

   ```
    cd terraform
    terraform init
   ```

5. Run the terraform plan to see if all resources are expected:

   ```
   terraform plan
   ```

6. Apply the changes to the AWS Cloud! NOTE: The autoapprove parameter is optional and not needed!
   ```
   terraform apply -auto-approve
   ```

## Destroying Resources

1. If you wish to tear down these cloud resources:

   ```
   # We need to delete the load balancer and autoscaling group to remove EC2 instances to be able to destroy all resources tied to the internet gateway

   terraform destroy -target=aws_lb.ecs_lb -auto-approve
   terraform destroy -target=aws_autoscaling_group.ecs_asg -auto-approve

   terraform destroy -auto-approve
   ```

At times this command can hang and this happens usually when the task definition is stuck running within the ECS Cluster. You may need to enter the AWS console and manually stop this task definition from running. Then it will work as expected.
