import React from 'react'
import style from './index.styl'
import Panel from '../common/panel/index.jsx'
export default () => (
    <div className={style.wrapper}>
        <Panel title="this is test panel">
            <h3>this is content</h3>
        </Panel>
    </div>
)