import { server } from "./server"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (videoId.includes("shorts")) {
    const [_, params] = videoURL.split("/shorts/")
  } else {
    const [_, params] = videoURL.split("/watch?v=")
  }
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get(`/summary/${videoID}`)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
const form2 = document.querySelector("#form2")
const input2 = document.querySelector("#file")


form2.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const file = input2.files[0]
  console.log(file)


  content.textContent = "Enviando arquivo..."


  // Cria um FormData e adiciona o arquivo
  const formData = new FormData();
  formData.append('file', file); // O 'arquivo' deve corresponder ao nome esperado no servidor

  try {
    const response = await server.post("/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const blobSilent = await response.blob();

    // adicionar link para download de blobSilent em content
    content.textContent = "Baixe o arquivo abaixo..."
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blobSilent)
    link.download = "audio.mp4"
    link.textContent = "Baixar arquivo"
    content.appendChild(link)
    content.classList.remove("placeholder")
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
    content.textContent = "Falha no envio do arquivo.";
  } finally {
    content.classList.remove("placeholder");
  }
})