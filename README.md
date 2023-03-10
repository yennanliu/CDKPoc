# CDKPoc
>AWS Cloud Development Kit (CDK) POC

```
programming code -- CDK --> CloudFormation (CFN) ----> AWS infra
```

- Primary language
	- Typescript, Python
- https://cdkworkshop.com/
- https://github.com/aws-samples/aws-cdk-examples

- Tool
	- VSCode
		- plugin
			- [AWS toolkit](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode)

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

- tsconfig.json：typescript 設定檔

- .npmignore：告訴 npm 應該要排除的文件

- node_modules：nodejs 套件包執行完 npm install 後的文件都會安裝在此資料夾裡面

- test：CDK 測試的程式位置
```

## Ref
- TypeScript
	- [Learn TypeScript – FreeCodeCamp](https://www.youtube.com/watch?v=30LWjhZzg50)
- CDK tutorial
	- src1
		- https://ithelp.ithome.com.tw/users/20117701/ironman/3734
		- https://www.youtube.com/results?search_query=How+to+use+AWS+CDK%3F+%7C+%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8AWS+CDK%E4%BE%86%E9%96%8B%E7%99%BC
	- src2
		- https://www.youtube.com/watch?v=T-H4nJQyMig
