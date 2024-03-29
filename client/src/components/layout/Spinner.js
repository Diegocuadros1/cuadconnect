//loading a gif
import React, { Fragment } from "react";

export default () => (
  <Fragment>
    <div>
      <div
        style={{
          width: "100%",
          height: "0",
          paddingBottom: "56%",
          position: "relative",
        }}
      >
        <iframe
          src="https://giphy.com/embed/PWFLIuyQb5bv96WiTj"
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          //frameBorder="0"
          className="giphy-embed"
          //allowFullScreen
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/2d-splash-dot-PWFLIuyQb5bv96WiTj">
          via GIPHY
        </a>
      </p>
    </div>
  </Fragment>
);

//<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/VseXvvxwowwCc" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/VseXvvxwowwCc">via GIPHY</a></p>

//<img
//  src={spinner}
//  style={{ width: "200px", margin: "auto", display: "block" }}
//  alt="Loading..."
///>
