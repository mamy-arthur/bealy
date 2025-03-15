export const message = `
<style>
.container {
    max-width: 600px;
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}
h2 {
    color: #333;
}
.button {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    background: #007bff;
    text-decoration: none;
    border-radius: 5px;
}
.footer {
    margin-top: 20px;
    font-size: 12px;
    color: #666;
}
</style>
<div class="container">
    <h2>Réinitialisation de votre mot de passe</h2>
    <p>Bonjour <strong>{{username}}</strong>,</p>
    <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour procéder :</p>
    <p style="text-align: left;">
        <a href="{{url}}" class="button">Réinitialiser mon mot de passe</a>
    </p>
    <p>Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail.</p>
    <p class="footer">Si vous avez besoin d'aide, contactez-nous à <a href="mailto:support@votre-site.com">support@votre-site.com</a>.</p>
    <p class="footer">Merci, <br> <strong>L'équipe Bealy App</strong></p>
</div>`;