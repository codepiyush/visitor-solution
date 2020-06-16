import React from 'react'
import axios from 'axios'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            checkin: true,
            vName: '',
            vEmail: '',
            vNumber: 0,
            hName: '',
            hEmail: '',
            hostDetails: {},
            hostSet: false,
            checkedIn: false,
            vError: {},
            hError: {},
            outname: '',
            outemail: '',
            recvOtp: false,
            cOutDetails: {},
            otp:'',
            checkedOut: false,
            otperr: false
        }
        this.renderCheckIn = this.renderCheckIn.bind(this);
        this.handleCiClick = this.handleCiClick.bind(this);
        this.handleCoClick = this.handleCoClick.bind(this);
        this.onGetHost = this.onGetHost.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onCheckin = this.onCheckin.bind(this);
        this.onChangeHost = this.onChangeHost.bind(this);
        this.renderCheckOut = this.renderCheckOut.bind(this);
        this.getOTP = this.getOTP.bind(this);
        this.checkOut = this.checkOut.bind(this)
    }
    async onGetHost() {
        console.log('clicked')
        const payload = {
            name: this.state.hName,
            email: this.state.hEmail
        }
        console.log(payload)
        await axios.post('http://localhost:5000/api/gethost', payload)
            .then(res => {
                console.log(res.data)
                this.setState({ hostDetails: res.data, hostSet: true })
            })
            .catch(err => {
                this.setState({ vError: err.response.data })
            })
    }
    async onCheckin() {
        const { vName, vEmail, vNumber, hostDetails } = this.state
        const payload = {
            name: vName,
            email: vEmail,
            mobileNo: vNumber,
            hostId: hostDetails._id,
            hostEmail: hostDetails.email,
            hostNo: hostDetails.mobileNo
        }
        await axios.post('http://localhost:5000/api/addVisitor', payload)
            .then(res => {
                this.setState({ checkedIn: true, hostSet: false, hostDetails: {} })
            })
            .catch(err => {
                this.setState({ hError: err.response.data })
            })
    }
    getOTP(){
        const payload = {
            name: this.state.outname,
            email: this.state.outemail
        }
        axios.post('http://localhost:5000/api/checkout/getOtp', payload)
        .then(res=>{
            this.setState({cOutDetails: res.data,recvOtp:true})
        })
        .catch(err=>console.log(err.response.data))
    }
    checkOut() {
        const payload = {
            name: this.state.outname,
            email: this.state.outemail,
            otp: this.state.otp
        }
        console.log(payload)
        axios.post('http://localhost:5000/api/checkout/', payload)
        .then(res=>{
            console.log('here')
            this.setState({checkedOut: true, recvOtp: false})
        })
        .catch(err=>{
            this.setState({otperr: true})
        })
    }
    renderCheckOut() {
        return (
            <React.Fragment>
                {this.state.recvOtp ?
                    <React.Fragment>
                        <div className='OtpPart'>
                            <p>
                                Name: {this.state.cOutDetails.visitor.name}
                            </p>
                            <p>
                                Email: {this.state.cOutDetails.visitor.email}
                            </p>
                        </div>
                        <input type="text" name="otp" id="otp" placeholder="Enter Otp" className='vInputs' onChange={this.onTextChange} required  />
                        <button id='checkin' onClick={this.checkOut}>Check Out</button>
                        <button id='getOtp' onClick={this.getOTP}>Resend OTP</button>
                        {this.state.otperr?<p style={{color: 'red'}}>OTP does not match</p> : <p></p>}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="inputFields">
                            <p className='inpHead'>Enter your Details to Check Out</p>
                            <input type="text" name="outname" id="name" placeholder="Enter Name" className='vInputs' onChange={this.onTextChange} required />
                            <input type="email" name="outemail" id="email" placeholder="Enter Email" className='vInputs' onChange={this.onTextChange} required />
                        </div>
                        <div>
                            <button id='getOtp' onClick={this.getOTP}>Find And Get OTP</button>
                        </div>
                        <div>
                            {this.state.checkedOut?<h2 style={{color: 'green'}}>Successfully Checked Out</h2>: <p></p>}
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangeHost() {
        this.setState({ hostSet: false, hostDetails: {} })
    }
    renderCheckIn() {
        return (
            <React.Fragment>
                <div className="inputFields">
                    <p className='inpHead'>Enter your Details</p>
                    <input type="text" name="vName" id="name" placeholder="Enter Name" className='vInputs' onChange={this.onTextChange} required />
                    <input type="email" name="vEmail" id="email" placeholder="Enter Email" className='vInputs' onChange={this.onTextChange} required />
                    <input type="number" name="vNumber" id="number" placeholder="Enter 10 Digit Mobile Number" className='vInputs' onChange={this.onTextChange} maxLength={10} required />
                </div>
                {this.state.hostSet ?
                    <React.Fragment>
                        <div>
                            <p>Your Host Details</p>
                            <p>Name: {this.state.hostDetails.name}</p>
                            <p>Email: {this.state.hostDetails.email}</p>
                            <p>Mobile: {this.state.hostDetails.mobileNo}</p>
                        </div>
                        <div>
                            <button id='getHost' onClick={this.onChangeHost}>Chnage Host</button>
                        </div>
                    </React.Fragment> :
                    <div className='inpFields2'>
                        <p className='inpHead'>Enter Host Details</p>
                        <input type="text" name="hName" id="Hname" placeholder='Enter Host Name' className='hInputs' onChange={this.onTextChange} required />
                        <input type="text" name="hEmail" id="Hemail" placeholder='Enter Host Email' className='hInputs' onChange={this.onTextChange} required />
                        <br />
                        <button id='getHost' onClick={this.onGetHost}>Get Host Details</button>
                    </div>}
                <div>
                    {this.state.hostSet ?
                        <button id='checkin' onClick={this.onCheckin} style={{ cursor: "pointer" }}>Check In</button> :
                        <button id='checkin' disabled onClick={this.onCheckin} style={{ cursor: "not-allowed", backgroundColor: 'grey' }}>Check In</button>
                    }
                </div>
                <div>
                    {this.state.checkedIn ? <h2 className='finalMsg'>Successfully Checked In</h2> : <p></p>}
                </div>
            </React.Fragment>
        )
    }
    handleCiClick() {
        this.setState({ checkin: true, otperr:false,checkedOut: false })
    }
    handleCoClick() {
        this.setState({ checkin: false,checkedIn: false })
    }
    render() {
        return (
            <div className='form-container'>
                {this.state.checkin ? <nav className='nav'>
                    <div id='op0' style={{ backgroundColor: 'White', color: ' #045c72', fontWeight: 'bold' }} className='op' onClick={this.handleCiClick}>
                        Checkin
                    </div>
                    <div id='op1' className='op' onClick={this.handleCoClick}>
                        Checkout
                    </div>
                </nav> : <nav className='nav'>
                        <div id='op0' className='op' onClick={this.handleCiClick}>
                            Checkin
                    </div>
                        <div id='op1' className='op' style={{ backgroundColor: 'White', color: ' #045c72', fontWeight: 'bold' }} onClick={this.handleCoClick}>
                            Checkout
                    </div>
                    </nav>}

                {this.state.checkin ? this.renderCheckIn() : this.renderCheckOut()}
            </div>
        )
    }
}

export default App;