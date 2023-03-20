## Run flask ECS cluster

## Commands

```bash
mkdir ecs-flask-cluster-1 && cd ecs-flask-cluster-1
cdk init app --language typescript

# update lib/custom-vpc1-stack.ts
# update bin/custom-vpc1.ts

cdk diff
cdk deploy
```

