import React from 'react';

import RssFeed from './RssFeed';

export default {
    title: 'RssFeed',
    component: RssFeed
}

export const Template = (args) => <RssFeed {...args}/>
Template.args = {
    url: 'https://gist.githubusercontent.com/lafleurh/6dd17525f0ed4a81dd1443c1101fd024/raw/342c1bdd7cd85a701bbfa17c52a71fa5f2e36b90/samplerss.json'
    , width: 400
}