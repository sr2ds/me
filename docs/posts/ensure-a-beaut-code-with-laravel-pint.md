# Ensure a beaut code with Laravel Pint

Hello,

This is my first full English post! So, I'd starting with "sorry" for my wrongs, I'm learning :)

If you, like me, has Laravel inside your world and like beautiful things, I think you need to meet the Laravel Pint.

Laravel Pint help us to keep a good code style.

Working in one team without some code styler or some texteditor settings, usually we need to check a lot of spaces changes, breaklines, positions in the Pull Request review. It's so bad and sad to review one big PR with a lot of 'non-necessary-changes'.

To solve this, we can setup the default code style for everyone of the time, this make more easy to check codes from other person and improve the PR Review moments.

With `Laravel Pint` is so easy setup a one default way to this, without extra settings like with pure PHP-CS.

Let's install de Pint with the normal command:

```
composer require laravel/pint --dev
```

After installation, you can just run:
```
./vendor/bin/pint 
```

At the first time, you can see a lot of files changes, like in this my personal hobby project:

![Changes after run command](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yzakuzy0goznqxufrqh9.png)

Of course, in this simple way, you will need run the command before commits to ensure a correct code style. We can improve this we can to use some `pre-commit` hook, like a `grumphp` https://github.com/phpro/grumphp.

In other post, I can write more about `grumphp`, but if you want, you can check the oficial docs to learn more.

For today it's only, thanks for read! :)