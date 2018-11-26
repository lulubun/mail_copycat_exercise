import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, MenuItem, Button, Paper, Popper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as selectors from '../selectors';
import * as actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
  
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      searchTerm: null,
      searchResults: [],
      isSearching: null,
    }
  }

  closeSearch = () => {
    this.setState({isSearching: null, searchResults: [], searchTerm: null})
  }

  renderSearchItems = (items) => {
    return items.map((i) => (
      <MenuItem
        key={i.id}
        onClick={() => {
          this.closeSearch();
          return this.props.setValue('oneEmail', i);
        }}
      >
        {i.sender}: {i.subject}
      </MenuItem>
    ))
  }

  createSearchResults = (term, mails) => {
    console.log('term, mails: ', term, mails);
    return mails.reduce((a, m) => {
      const newA = a;
      if (term && (m.subject.includes(term) || m.sender.includes(term) || m.body.includes(term))) {
        newA.push(m);
      }
      return newA;
    }, [])
  }

  render() {
    const { allMail, setValue } = this.props;
    const { isSearching, searchResults } = this.state;
    return (
      <div className={'App-header'}>
        <AppBar style={{
          backgroundColor: 'white',
          color: 'black',
        }}>
          <Toolbar>
            <Typography className={'header-title'} variant="title" color="inherit" noWrap>
              LoftMail
            </Typography>
            <div className={'search-bar'}>
              <div className={'searchIcon'}>
                <SearchIcon button onClick={() => {
                  this.props.setValue('searchResults', searchResults);
                  this.closeSearch();
                }} />
              </div>
              <InputBase
                placeholder="Search…"
                ref={el => this.inputTitle = el} //eslint-disable-line
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    this.props.setValue('searchResults', searchResults);
                    this.closeSearch();
                  }
                  }}
                onChange={(e) => {
                  if (Object.is(e.target.value, '')) {
                    this.setState({ isSearching: null });
                    this.props.setValue('searchResults', null);
                  } else {
                    this.setState({ isSearching: true });
                    const term = e.target.value;
                    const searchRes = allMail.reduce((acc, m) => {
                      if (term && (m.subject.toLowerCase().includes(term.toLowerCase()) || m.sender.toLowerCase().includes(term.toLowerCase()) || m.body.toLowerCase().includes(term.toLowerCase()))) {
                        return acc.concat(m);
                      }
                      return acc;
                    }, []);
                    this.setState({ searchResults: searchRes });
                  }
                }}
              />
              {isSearching && 
                <Popper
                  anchorEl={this.inputTitle}
                  open={isSearching}
                  onClose={this.closeSearch}
                >
                  <Paper
                    style={{
                      marginTop: '9vh'
                    }}
                  >
                    {searchResults.map((i) => (
                        <Button
                          fullWidth
                          style={{
                            backgroundColor: 'transparent',
                            alignContent: 'left'
                          }}
                          key={i.id}
                          onClick={() => {
                            console.log('i: ', i);
                            this.closeSearch();
                            setValue('oneEmail', i);
                          }}
                        >

                          {i.sender}: {i.subject}
                        </Button>
                      ))
                    }
                  </Paper>
                </Popper>}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allMail: selectors.getMail(),
});
  
const mapDispatchToProps = (dispatch) => ({
    setValue: (key, val) => dispatch(actions.setValue(key, val)),
})
  


export default connect(mapStateToProps, mapDispatchToProps)(Header);
