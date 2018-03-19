const withLoading = BaseComponent => ({isLoading, ...otherProps}) => (
    isLoading
        ?
        <div>加载中。。。</div>
        :
        <BaseComponent {otherProps}/>
)

const flatten = propKey => BaseComponent => props => <BaseComponent {...props} {...props[propKey]}/>

exports = {
    withLoading,
    flatten
}
