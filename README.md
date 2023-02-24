# CDKPoc
>AWS Cloud Development Kit (CDK) POC

```
programming code -- CDK --> CloudFormation (CFN) ----> AWS infra
```

- Primary language
	- Typescript, Python
- https://cdkworkshop.com/
- https://github.com/aws-samples/aws-cdk-examples

## Example CDK structure
```
├── bin
│   └── cdk-demo.ts
├── cdk.json
├── jest.config.js
├── lib
│   └── cdk-demo-stack.ts
├── package.json
├── package-lock.json
├── README.md
├── test
│   └── cdk-demo.test.ts
└── tsconfig.json

- bin/cdk-project.ts - 這是進入 CDK 應用程式的途徑。此檔案將會載入/建立我們在 lib/* 底下定義的所有堆疊

- lib/cdk-project-stack.ts - 這是主要的 CDK 應用程式堆疊的定義之處。資源及其屬性可存放於此處。

- package.json - 您會在此處定義專案相依性，以及一些額外資訊和建置指令碼 (npm build、npm test、npm watch)。

- cdk.json - 此檔案會向工具組指出如何執行你的應用程式，以及與 CDK 和你的專案相關的一些額外設定和參數。
```

## Ref
- TypeScript
	- [Learn TypeScript – FreeCodeCamp](https://www.youtube.com/watch?v=30LWjhZzg50)
- CDK tutorial
	- src1
		- https://ithelp.ithome.com.tw/users/20117701/ironman/3734
		- https://www.youtube.com/watch?v=YwJViDmIuYM
	- src2
		- https://www.youtube.com/watch?v=T-H4nJQyMig
