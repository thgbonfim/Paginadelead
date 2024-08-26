<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $telefone = htmlspecialchars($_POST['telefone']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    // Email para onde o formulário será enviado
    $para = "thiagobonfim73@gmail.com";  // Altere para o seu e-mail

    // Assunto do e-mail
    $assunto = "Novo contato de suporte técnico";

    // Corpo do e-mail
    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Telefone: $telefone\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    // Cabeçalhos do e-mail
    $headers = "From: $email";

    // Envia o e-mail
    if (mail($para, $assunto, $corpo, $headers)) {
        echo "Obrigado! Sua mensagem foi enviada com sucesso.";
    } else {
        echo "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.";
    }
}
?>
