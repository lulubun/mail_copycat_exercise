import React from 'react';
import { List, ListItem, Divider, Tabs, Tab, Checkbox } from '@material-ui/core'
import moment from 'moment';
  
class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabVal: 0,
      checked: [],
    }
  }

  handleChange = (event, value) => {
    this.setState({ tabVal: value });
  };

  

  renderEachItem = (mails) => {
    const { tabVal } = this.state;
    const { opened, setValue } = this.props;
    let filteredMail = mails;
    if (tabVal === 1) {
      filteredMail = mails.filter((m) => m.tags.includes('work'))
    }
    if (tabVal === 2) {
      filteredMail = mails.filter((m) => m.tags.includes('travel'))
    }
    return filteredMail.map((m) => {
      const isRead = opened.includes(m.id)
      return (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: isRead ? '#eff0f1' : null,
          }}
          key={m.id}
        >
        <Checkbox
            checked={this.state.checked.includes(m.id)}
            tabIndex={-1}
            onChange={(e) => {
              if (!e.target.checked) {
                this.setState({checked: this.state.checked.filter((c) => c !== m.id)})
                setValue('checked', this.state.checked.filter((c) => c !== m.id))
              } else {
                this.setState({checked: this.state.checked.concat([m.id])})
                setValue('checked', this.state.checked.concat([m.id]))
              }              
            }}
          />
          <ListItem
            button
            onClick={() => this.props.setValue('oneEmail', m)}
            style={{
              width: '99vw'
            }}
          >
            <p>{m.sender} {m.subject} {moment(m.date).format('MMM DD')}</p>
          </ListItem>
          <Divider />
        </div>
      )
    })
  }
  
  render() {
    const { isSearching, mails } =this.props;
    const tabStyles = {
      minWidth: '25vw',
    }
    return (
      <div className={'Main-list'}>
       {!isSearching && <Tabs
          value={this.state.tabVal}
          onChange={this.handleChange}
          style={{ marginTop: '2vh'}}
        >
          <Tab style={tabStyles} label="All Mail" />
          <Tab style={tabStyles} label="Work" />
          <Tab style={tabStyles} label="Travel" />
        </Tabs>}
        <List>
          {this.renderEachItem(mails)}
        </List>
      </div>
    );
  }
}

export default MailList;
