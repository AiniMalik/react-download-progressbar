import './App.css';
import { useState } from 'react';
import throttle from 'lodash.throttle'
import ProgressBar from './ProgressBar'
function App() {
  const [progress, setProgress] = useState(0)
  const updateProgress = throttle((value) => {
      setProgress(value) 
  }, 100, {leading: true, trailing: true})
  const handleOnClick = async () => {
    const response = await fetch("https://res.cloudinary.com/dcznpsql4/video/upload/v1716279808/Assets/waterfall_bq3ss1.mp4");
    if (!response.body) return;
    const contentLength = response.headers.get('Content-Length')
    const totalLength = typeof contentLength === "string" && parseInt(contentLength)
    const reader = response.body.getReader()
    const chunks = []
    let receivedLength = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      receivedLength = receivedLength + value.length;
      if (typeof totalLength === 'number') {
        const step = parseFloat((receivedLength / totalLength).toFixed(2) * 100)
        updateProgress(step)
      }
    }
    const blob = new Blob(chunks)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.href = url
    a.download = 'waterfall.mp4'
    function handleOnDownload() {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", handleOnDownload);  
      },150)
    }
    a.addEventListener('click', handleOnDownload, false)
    a.click()
  }

 

  return (
    <div className="App">
      <header className="App-header">
        <div className="innerWrapper">
          <p className="App-logo">WaterFall</p>
          <video width="320" height="240" controls>
            <source
              src="https://res.cloudinary.com/dcznpsql4/video/upload/v1716279808/Assets/waterfall_bq3ss1.mp4"
              type="video/mp4"
            />
          </video>
          <a
            className="App-link"
            href="https://res.cloudinary.com/dcznpsql4/video/upload/v1716279808/Assets/waterfall_bq3ss1.mp4"
            onClick={handleOnClick}
          >
            Download
          </a>
          <ProgressBar
            bgcolor="green"
            progress={progress.toFixed()}
            height={7}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
