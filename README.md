# QR Code with Logo Generator

使用 Node.js 生成带有中间 logo 的二维码。

## 安装

```bash
npm install
```

## 使用方法

### 命令行使用

```bash
# 基本用法
node generate-qrcode.js "你的文本或URL" logo.png output.png

# 示例
node generate-qrcode.js "https://github.com" logo.png qrcode-output.png
```

### 在代码中使用

```javascript
import { generateQRCodeWithLogo } from './generate-qrcode.js';

await generateQRCodeWithLogo({
  text: 'https://example.com',        // 要编码的文本或URL
  logoPath: './logo.png',             // logo图片路径
  outputPath: './qrcode-output.png',  // 输出文件路径
  qrSize: 400,                        // 二维码尺寸（像素）
  logoSizeRatio: 0.25,                // logo占二维码的比例（建议0.2-0.3）
  qrColor: '#000000',                 // 二维码颜色
  backgroundColor: '#ffffff',         // 背景颜色
  margin: 2,                          // 边距
  errorCorrectionLevel: 'H'           // 容错级别 (L, M, Q, H)
});
```

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | string | 必填 | 要编码到二维码中的文本或URL |
| `logoPath` | string | 必填 | logo图片的路径 |
| `outputPath` | string | 必填 | 输出二维码图片的路径 |
| `qrSize` | number | 400 | 二维码的尺寸（像素） |
| `logoSizeRatio` | number | 0.25 | logo占二维码的比例，建议0.2-0.3 |
| `qrColor` | string | '#000000' | 二维码前景色 |
| `backgroundColor` | string | '#ffffff' | 二维码背景色 |
| `margin` | number | 2 | 二维码边距 |
| `errorCorrectionLevel` | string | 'H' | 容错级别：L(7%), M(15%), Q(25%), H(30%) |

## 注意事项

1. **容错级别**：由于logo会遮挡部分二维码，建议使用 `H`（最高容错级别），确保二维码仍可正常扫描。

2. **Logo大小**：`logoSizeRatio` 建议设置在 0.2-0.3 之间。太大会影响二维码的可读性，太小则logo不够明显。

3. **支持的图片格式**：logo支持 PNG、JPEG、WebP 等常见格式。

## 创建测试 logo

```bash
node create-sample-logo.js
```

这会创建一个简单的示例 logo 用于测试。
