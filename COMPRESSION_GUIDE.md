# Guia de Compressão de Vídeo para Web

Seu site possui vídeos com alta qualidade, mas o tamanho total (~900MB) inviabiliza o carregamento rápido. Siga este guia para reduzir o tamanho mantendo a estética "Premium".

## 1. Ferramenta Sugerida: Handbrake (Grátis)
Baixe em: [handbrake.fr](https://handbrake.fr/)

### Configurações Recomendadas:
- **Formato**: MP4 (H.264) ou WebM (mais moderno/leve).
- **Dimensões**: 1080p (1920x1080) é o máximo necessário para web.
- **Framerate**: 24 ou 30 fps (mesmo do original).
- **Vídeo Encoder**: H.264 (x264).
- **Constant Quality (RF)**: Entre **22 e 24**. (Quanto maior o número, menor o arquivo e menor a qualidade).
- **Audio**: Desabilite o áudio se o vídeo for apenas decorativo (economiza muito espaço).

## 2. Metas de Tamanho por Vídeo:
- **Capa/Background**: Máximo 3MB.
- **Reels/Showcase**: Máximo 10MB.
- **Campanhas Longas**: Máximo 20MB.

## 3. Comandos Rápidos (se usar FFmpeg):
Se você tiver o FFmpeg instalado em seu computador, use este comando para cada vídeo:

```bash
ffmpeg -i seu-video.mp4 -vcodec libx264 -crf 24 -an output.mp4
```
*(-an remove o áudio, -crf 24 controla a qualidade)*

## 4. Por que isso é importante?
Um vídeo de 250MB demora cerca de 1 minuto para carregar em uma conexão de 30Mbps. Um vídeo de 10MB carrega em **2 segundos**. Otimizar os vídeos é o segredo para o selo de "Site do Ano".

---
*Após comprimir, basta substituir os arquivos na pasta `client/public/video` com os mesmos nomes.*
