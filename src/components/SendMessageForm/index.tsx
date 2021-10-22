import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext, AuthProvider } from '../../contexts/auth';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    async function handleSendMessage(event: FormEvent) {
        /**
         * Previni o comportamento padrão do HTML do submit, evita que ele recarregue a mesma página
         * como explicado abaixo.
         */
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        await api.post('messages', { message });

        setMessage('');
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    {/*É feito uma verificação se o user está nulo, antes de tentar acessar o avatar_url.*/} 
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            {/* 
              Por padrão quando damos um submit em um formulário, o html envia o usuário para uma página
              e se não colocarmos nenhum action no formulario ele irá recarregar a página que já estou.
            */}
            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea 
                    name="message"
                    id="message"
                    placeholder="Qual sua expectativa para o evento"
                    //Pegando o valor digitado e setando dentro do state
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                />
                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    )
}