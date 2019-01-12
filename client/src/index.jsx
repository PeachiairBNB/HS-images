import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Carousel from "./components/Carousel.jsx";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCoffee,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCoffee, faAngleLeft, faAngleRight);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      clicked: false,
      clickedImage: "",
      listingID: 1
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getPictures = this.getPictures.bind(this);
  }

  componentDidMount() {
    console.log(
      "This is the current URL >>>>>>>>>>",
      window.location.pathname.substr(1).split("/")[0]
    );
  
    let url_listing = window.location.pathname.substr(1).split("/")[0];

    console.log('this is the url listing', url_listing)

    this.setState(
      {
        listingID: url_listing
      }, () => {
        this.getPictures(this.state.listingID);
        console.log('this is the listing ID after setting state', this.state.listingID)
      }, console.log(this.state.pictures));  
  }

  getPictures(listingID) {
    let imagesNeeded = [];

    axios.get(`/api/pictures/${listingID}`).then(({ data }) => {
      // console.log('DID I RUN????????', data);
      data.forEach(listing => {
        imagesNeeded.push(listing.image.image_url.slice(55));
      });
      this.setState({
        pictures: imagesNeeded
      });
    });
  }

  handleClick(e) {
    let image = e.target.id;
    this.setState({
      clicked: true,
      clickedImage: image
    });
  }

  onMouseEnter(hoveredImage) {
    // console.log("onHover has run on >>>>>>>", clickedImage);

    if (hoveredImage === "a") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.b, .c, .d, .e`).animate({
            // opacity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.b, .c, .d, .e`).animate({
            opacity: 1,
            transition: 0.3
          });
        }
      );
    }

    if (hoveredImage === "b") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .c, .d, .e`).animate({
            opatcity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.a, .c, .d, .e`).animate({
            opacity: 1
          });
        }
      );
    }

    if (hoveredImage === "c") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .b, .d, .e`).animate({
            opacity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.a, .b, .d, .e`).animate({
            opacity: 1
          });
        }
      );
    }

    if (hoveredImage === "d") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .b, .c, .e`).animate({
            opacity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.a, .b, .c, .e`).animate({
            opacity: 1
          });
        }
      );
    }

    if (hoveredImage === "e") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .b, .c, .d`).animate({
            opacity: 0.25
          });
        },
        () => {
          // on out
          $(`.a, .b, .c, .d`).animate({
            opacity: 1
          });
        }
      );
    }
  }

  render() {
    if (this.state.clicked === false) {
      return (
        <main>
          <div className="wrapper">
            <img
              // onMouseEnter={() => {
              //   this.onMouseEnter("a");
              // }}
              onClick={e => this.handleClick(e)}
              clickedImage={this.state.clickedImage}
              className="a"
              id="0"
              src={`https://s3.us-east-2.amazonaws.com/hjs-images/${
                this.state.pictures[0]
              }`}
            />

            <img
              // onMouseEnter={() => {
              //   this.onMouseEnter("b");
              // }}
              onClick={this.handleClick}
              className="b"
              id="1"
              src={`https://s3.us-east-2.amazonaws.com/hjs-images/${
                this.state.pictures[1]
              }`}
            />

            <img
              // onMouseEnter={() => {
              //   this.onMouseEnter("c");
              // }}
              onClick={this.handleClick}
              className="c"
              id="2"
              src={`https://s3.us-east-2.amazonaws.com/hjs-images/${
                this.state.pictures[2]
              }`}
            />

            <img
              // onMouseEnter={() => {
              //   this.onMouseEnter("d");
              // }}
              onClick={this.handleClick}
              className="d"
              id="3"
              src={`https://s3.us-east-2.amazonaws.com/hjs-images/${
                this.state.pictures[3]
              }`}
            />

            <img
              // onMouseEnter={() => {
              //   this.onMouseEnter("e");
              // }}
              onClick={this.handleClick}
              className="e"
              id="4"
              src={`https://s3.us-east-2.amazonaws.com/hjs-images/${
                this.state.pictures[4]
              }`}
            />
          </div>
        </main>
      );
    }

    if (this.state.clicked === true) {
      return (
        <Carousel
          clickedImage={this.state.clickedImage}
          pictures={this.state.pictures}
        />
      );
    }
  }
}

// ReactDOM.render(<App />, document.getElementById("image-carousel"));
window.ImageCarousel = App;
