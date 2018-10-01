import React, { Component } from 'react'
import ImageBond from './assets/bond_approve.jpg'
import './Form.css'

class InitParamForm {
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.password = '';
    }
}

class Form extends Component {
    state = {
        ...new InitParamForm(), 
        errors: new InitParamForm(),
        isValid: false
    }

    handleChange = field => event => {
        this.setState({[field]: event.target.value, errors: new InitParamForm()});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.validate();
    }

    validate = () => {
        let errors = this.state.errors;

        errors.firstName = this.validFirstName();
        errors.lastName = this.validLastName();
        errors.password = this.validPassword();

        this.setState({errors, isValid: this.isValid(errors)});
    }

    isValid = errors => !errors.firstName && !errors.lastName && !errors.password

    validFirstName = () => {
        const { firstName } = this.state

        if(firstName) {
            return (firstName.toUpperCase() !== 'JAMES' ? 'Имя указано не верно' : '');
        } else {
            return 'Нужно указать имя';
        }
    }

    validLastName = () => {
        const { lastName } = this.state

        if(lastName) {
            return (lastName.toUpperCase() !== 'BOND' ? 'Фамилия указана не верно' : '');
        } else {
            return 'Нужно указать фамилию';
        }
    }

    validPassword = () => {
        const { password } = this.state;

        if(password) {
            return (password !== '007' ? 'Пароль указан не верно' : '');
        } else {
            return 'Нужно указать пароль';
        }
    }

    renderForm = () => {
        const {firstName, lastName, password, errors} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Введите свои данные, агент</h1>

                <p className={'field'}>
                    <label className={'field__label'} for='firstname'>
                        <span className={'field-label'}>Имя</span> 
                    </label>
                    <input 
                        name='firstname'
                        type='text'
                        className={'field__input field-input t-input-firstname'} 
                        value={firstName}
                        onChange={this.handleChange('firstName')}
                    />
                    <span className={'field__error field-error t-error-firstname'}>
                        {errors.firstName}
                    </span>
                </p>

                <p className={'field'}>
                    <label className={'field__label'} for='lastname'>
                        <span className={'field-label'}>Фамилия</span>
                    </label>
                    <input 
                        name='lastname'
                        type='text'
                        className={'field__input field-input t-input-lastname'} 
                        value={lastName}
                        onChange={this.handleChange('lastName')}
                    />
                    <span className={'field__error field-error t-error-lastname'}>
                        {errors.lastName}
                    </span>
                </p>

                <p className={'field'}>
                    <label className={'field__label'} for='password'>
                        <span className={'field-label'}>Пароль</span>
                    </label>
                    <input
                        name='password'
                        type='password'
                        className={'field__input field-input t-input-password'} 
                        value={password}
                        onChange={this.handleChange('password')}
                    />
                    <span className={'field__error field-error t-error-password'}>
                        {errors.password}
                    </span>
                </p>
                
                <div className={'form__buttons'}>
                    <button className={'button t-submit'}>Проверить</button>
                </div>
            </form>
        )
    }

    renderImage = () => {
        return <img src={ImageBond} alt="bond approve" class="t-bond-image"></img>
    }

    render() {
        const {isValid} = this.state;

        return (
            <div className={'app-container'}>
                { !isValid ? this.renderForm() : this.renderImage() }
            </div>
        )
    }
}

export default Form