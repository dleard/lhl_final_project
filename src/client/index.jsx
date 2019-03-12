require("./styles/app.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faSearch, faPlusCircle, faCogs, faWrench, faCog, faRedo} from '@fortawesome/free-solid-svg-icons'

library.add(faAngleDoubleLeft, faAngleDoubleRight, faSearch, faPlusCircle, faCogs, faCog, faWrench, faRedo)


ReactDOM.render(<App />, document.getElementById('root'));
