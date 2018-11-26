import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Inbox, Drafts, Mail} from '@material-ui/icons';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import * as actions from '../actions';
  

class LeftNavigation extends React.Component {
  render() {
    return (
      <div className="left-nav">
        <List
          component="nav"
        >
          <ListItem button onClick={() => this.props.resetAll()}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
          </ListItem>
          <ListItem button onClick={() => this.props.setOpened(true)}>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText inset primary="Mark Read" />
          </ListItem>
          <ListItem button onClick={() => this.props.setOpened(false)}>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText inset primary="Mark Unread" />
          </ListItem>
        </List>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
  resetAll: () => dispatch(actions.resetAll()),
  setOpened: (b) => dispatch(actions.setOpened(b))
})
  


export default connect(mapStateToProps, mapDispatchToProps)(LeftNavigation);