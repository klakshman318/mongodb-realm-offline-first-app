import React from 'react';

export default function TimeEventsHOC(Component) {
    return class extends React.PureComponent {

        static defaultProps = Component.defaultProps;
        static propTypes = Component.propTypes;

        constructor(props) {
            super(props);
            this.intervals = [];
            this.timeouts = [];
        }

        UNSAFE_componentWillUnmount() {
            let i;
            for(i = 0; i < this.timeouts.length; i++) {
                clearTimeout(this.timeouts[i]);
            }
            for(i = 0; i < this.intervals.length; i++) {
                clearInterval(this.intervals[i]);
            }
            this.intervals = [];
            this.timeouts = [];
        }

        setInterval = (fn, duration) => {
            let interval = setInterval(fn, duration);
            this.intervals.push(interval);
            return interval;
        }

        setTimeout = (fn, duration) => {
            let timeout = setTimeout(fn, duration);
            this.timeouts.push(timeout);
            return timeout;
        }

        render() {
            return (
                <Component
                    {...this.props}
                    setTimeout={this.setTimeout}
                    setInterval={this.setInterval}
                />
            );
        }
    };
}
