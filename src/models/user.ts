import type RecoveryQuestions from "./recoveryQuestions";

export default class User {
    username: String; 
    email: String;
    password: String;
    recovery_questions: RecoveryQuestions[] | null;
    creation_method: String;
    constructor(
        username: String,
        email: String,
        password: String,
        recovery_questions: RecoveryQuestions[] | null,
        creation_method: String,
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.recovery_questions = recovery_questions;
        this.creation_method = creation_method;
    }
}