/**
 * Passamos toda a lógica, a responsabilidade de controlar a autenticação da nossa aplicação
 * para esse contexto, nisso ele vai provendo as informações necessárias para cada componente
 * o que cada componente precisa do fluxo de autenticação, todos eles vão ter acesso a essas inf
 * Sempre quando precisarmos que a informação seja acessível por vários elementos, componentes da
 * nossa aplicação em múltiplos níveis diferentes, a gente usa contextos, nos ajuda muito para
 * trabalhar esse compartilhamentos de informações. * 
 */
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    id: string;
    name:string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}

/**
 * Quando criamos um contexto no react, para definirmos qual vai ser o formato de dados,
 * criamos um objeto vazio e passamos um "as" e a tipagem daquele contexto, ex:AuthContextData 
 */ 
export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
    children: ReactNode
}

/**
 * Propriedade no react é uma informação que passamos de um
 * componente para outro.
 * Todo componente no react tem uma propriedade que se chama
 * children que é tudo que você inclui dentro do componente
 */
export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null);
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=176b7e7303cc467b2082`;

    type AuthResponse = {
        token: string;
        user: {
            id: string;
            avatar_url: string;
            name: string;
            login: string;
        }
    }

    //utilizando o async você consegue usar o await dentro da função
    async function signIn(githubCode: string){
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })

        const { token, user } = response.data;

        /**
         * Salva o token dentro do storage do navegador, se caso o usuário feche ele,
         * abra de novo, não fica validando todo tempo.
         *  */ 
        localStorage.setItem('@downile:token', token);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        /**
         * Os dados vindo do backend serão salvos dentro do estado
         * (useState) User
         */
        setUser(user);
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }
    /**
     * Recuperar o token salvo no navegador do usuário
     */
    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')

        /**
         * Se o token não estiver vazio, iremos buscar pela rota profile,
         * que criamos no back as inf do usuário
         */
        if (token){
            /**
             * O Axios (api é uma instância do axios) permite que a partir daqui
             * setamos o defaults.headers para que toda requisição daqui pra frente
             * ela vá automaticamente com o token de autenticação junto no cabeça-lho 
             * da requisição.
             */
            api.get<User>('profile').then(response => {
                console.log(response.data);
            })
        }
    })
    
    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')
            console.log({ urlWithoutCode, githubCode })

            /**
             *Remove o código da url, com isso o usuário não verá
             *em nenhum momento
             */
            window.history.pushState({}, '', urlWithoutCode);

            signIn(githubCode);
        }
    }, [])

    return (
        /**
         * Todos os componentes que tiverem dentro do AuthContext.Provider
         * terão acesso a informação, que se o usuário está autenticado ou não.
         * Quando se tem uma chave {} quer dizer que você quer colocar um javascript,
         * com 2 chaves {{}} quer dizer que essa informação é um objeto.
         */
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}

        </AuthContext.Provider>
    );
}