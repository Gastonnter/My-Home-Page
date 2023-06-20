import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mailerState: {
        name: "",
        email: "",
        asunto: "",
        message: "",
      },
    };
  }

  submitEmail = async (e) => {
    e.preventDefault();
    const { mailerState } = this.state;
    console.log({ mailerState });
    await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        this.setState({
          mailerState: {
            name: "",
            email: "",
            asunto: "",
            message: "",
          },
        });
      });
  };

  handleStateChange = (e) => {
    const { mailerState } = this.state;
    this.setState({
      mailerState: {
        ...mailerState,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    this.setState({
      mailerState: {
        name: "",
        email: "",
        asunto: "",
        message: "",
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        mailerState: {
          name: "",
          email: "",
          asunto: "",
          message: "",
        },
      });
    }
  }

  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form
                action=""
                method="post"
                id="contactForm"
                name="contactForm"
              >
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Nombre <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      size="35"
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={this.handleStateChange}
                      value={this.state.mailerState.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      placeholder="Your Email"
                      type="text"
                      size="35"
                      id="email"
                      name="email"
                      onChange={this.handleStateChange}
                      value={this.state.mailerState.email}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Asunto</label>
                    <input
                      placeholder="Asunto"
                      type="text"
                      size="35"
                      id="asunto"
                      name="asunto"
                      onChange={this.handleStateChange}
                      value={this.state.mailerState.asunto}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Mensaje <span className="required">*</span>
                    </label>
                    <textarea
                      placeholder="Mensaje"
                      cols="50"
                      rows="15"
                      id="message"
                      name="message"
                      onChange={this.handleStateChange}
                      value={this.state.mailerState.message}
                    ></textarea>
                  </div>

                  <div>
                    <button className="submit" onClick={this.submitEmail}>
                      Enviar
                    </button>
                    <span id="image-loader">
                      <img alt="" src="images/loader.gif" />
                    </span>
                  </div>
                </fieldset>
              </form>

              <div id="message-warning"> Error boy</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank
                you!
                <br />
              </div>
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Direccion y Telefono</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} <br />
                  {city}, {state} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
