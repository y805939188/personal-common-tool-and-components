const path = require('path')
module.exports = {
  // 有个坑儿 就算测试全通过 也会报错 package.json 里加上这个 jest --verbose ./src || true
  // 测试时候是否把第一个参数也显示出来 第一个参数就是test执行时候传进去的那个名字 这个有用 一般携程true
  // verbose: false,
  // 每次测试自动清除mock的calls和instnces 和jest.clearAllMocks()一样
  // clearMocks: true,
  // 当执行测试的时候 是否要集成覆盖率的信息 加上这个就会在控制台打印覆盖率了
  collectCoverage: true,
  // 在做覆盖率的时候忽略哪些个文件 可用正则
  coveragePathIgnorePatterns: ["/node_modules/", "/jest/",],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/jest/dummy/less.ts",
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/mock/fileMock.ts",
  },
  globals: {
    "__DEV__": true,
  },
  preset: 'ts-jest',
  setupFiles: [path.join(__dirname, 'jest', 'setup.ts')],
  setupFilesAfterEnv: [path.join(__dirname, 'jest', 'enzyme.ts')],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\.svg$": "jest-svg-transformer",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
