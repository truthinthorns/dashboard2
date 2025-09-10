import type RecoveryQuestions from "./recoveryQuestions";

export default class User {
    username: string; 
    email: string;
    password: string;
    recovery_questions: RecoveryQuestions[] | null;
    creation_method: string;
    constructor(
        username: string,
        email: string,
        password: string,
        recovery_questions: RecoveryQuestions[] | null,
        creation_method: string,
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.recovery_questions = recovery_questions;
        this.creation_method = creation_method;
    }
}