import React, { memo } from 'react';
import PropTypes from 'prop-types';

function Button({ label, disabled, onClick, className, ...props }) {
    const buttonClass = `${className || ''} button btn-primary`;

    return (
        <button className={buttonClass} disabled={disabled} onClick={onClick} {...props}>
            {label}
        </button>
    );
}

Button.displayName = 'Button';

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

Button.defaultProps = {
    onClick: () => {},
    disabled: false,
};

export default memo(Button);
