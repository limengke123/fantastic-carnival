import React from 'react'
import Article from '../article/index'
export default () => (
    <main>
        {[1,2,3].map(val => (
            <Article key={val}/>
        ))}
    </main>
)