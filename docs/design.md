# Appmod Blueprints Design 

## Appmod Pathways

- Move to containers / move to cloud-native
- Move to modern DevOps
- Move to managed (databases)

## Structure

- applications ()
  - java - micronaut or springboot
  - node - ts and some front end
  - go - backend app
  - .net    
- deployment
  - envs
    - dev
      - app of apps for dev 
    - prod
  - teams
    - team-j
    - team-n
    - team-g
    - team-c
- platform
  - components
  - traits
  - infra
    - lib
      - pipeline
      - teams *# includes team specific infrastructure*
      - blueprints
      - addons

### Applications

Each application contains code for execution outside of containers.
Each application also contains a containerization approach specific to the target runtime, such as jib or Dockerfile. 

There will be one application that does not have code and has just executables. App2container will be used to containerize. 

### Deployment

Contains GitOps artifacts to deploy applications in bulk using ArgoCD

### Platform

Components contains OAM model for supported platform components like frontend, backend, api (e.g. with appgateway support)
Traits contain traits like ingress, resiliency, flagger
Infra contains an EKS Blueprints configuration for cluster and pipeline with dev and prod

## Workshop Flow

Prereqs

- Each attendee gets an AWS account with Workshop Studio
- Workshop will be using one region such as us-east-2
- Each account/region contains a basic EKS cluster that represents a non-modernized environment (such as on-prem)
- Each account/region contains a VPC such as default with 3 public and 3 private subnets (optional, saves time on infra deployment) 

## Module 1
* Select application:
    1. nodejs app
    2. micronaut app
    3. legacy app, only executable
* Containerize
    - Create docker file for 1 and 2
    -  app2container for 3
* In local kubernetes instance
    - Go through creation of deployment artifacts for one service, such as deployment, HPA, secrets, service (lb ?), any policies, network, etc. 
## Module 2 Kubevela 
    - introduce OAM
    - deploy kubevela through CLI
    - create OAM for the app and deploy

## Module 3 GitOps
* Prepare for portability
    - Introduce ArgoCD
    - Deploy ArgoCD through CLI
    - Create apps and app of apps
    - Deploy app of apps

## Module 4
* Create infrastructure for dev/prod
    - Blueprint (use ootb) with ArgoCD and Kubevela, as well as Nginx, external DNS and external secrets
    - Add teams and secrets, create databases and queues and service accounts
    - Bootstrap argo to point to the app of apps
    - Deploy dev
    - Replicate dev to prod with pipeline
    - Replace dev with new dev with apps in flight
## Module 5
* Promotions
    - Create dev apps of apps and prod app of apps
    - Introduce a change to the app and execute a no-op CICD process
    - Observe promotion
* CICD
    - Create CodeBuild with static code analysis and basic test
    - Create performance test
* Introduce a change to the application - PR
    - Show static code analysis and performance test running
    - show automatic promotion from dev to prod
* Progressive delivery example on one of the apps with Flagger

