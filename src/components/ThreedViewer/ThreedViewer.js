import  React , { useEffect, useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import still from "./../../assets/chapter1-still.jpg"
import play from "./../../assets/play-button.svg";
import "./style.css"

function ThreedViewer() {
  const container = useRef(null);
  const [state, setstate] = useState(true)
  var viewer= null


  const startMarmoset= ()=>{
    const marmoset = window.marmoset;

    if (marmoset) {
      var params = {
        autoStart: false,
        fullFrame: true,
        pagePreset: false,
      };
      viewer = marmoset.embed("Room_2.mview", params);
      // const height  = container.current.getBoundingClientRect().height;
      // const width = container.current.getBoundingClientRect().width;
      // var viewer = new marmoset.WebViewer("Room_2.mview", params);
      marmoset.noUserInterface = true; //please be considerate
      container.current.appendChild(viewer.domRoot);
      setstate(false)
    }
  }

  return (
    <Container fluid>
      <div ref={container} className="m-container">
        {state?<div className="t-image-container">
          <img className="t-placeholder" src={still} />
          <img className="t-play" src={play} onClick={startMarmoset} />
        </div> : <div></div>}
      </div>
    </Container>
  );
}

export default ThreedViewer;
