<?php

namespace App\EventSubscriber;

use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use CoopTilleuls\ForgotPasswordBundle\Event\UpdatePasswordEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

final class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly TokenStorageInterface $tokenStorage, private readonly MailerInterface $mailer, private EntityManagerInterface $manager)
    {
    }
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
            CreateTokenEvent::class => 'onCreateToken',
            UpdatePasswordEvent::class => 'onUpdatePassword',
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest() || !str_starts_with($event->getRequest()->get('_route'), 'coop_tilleuls_forgot_password')) {
            return;
        }

        // User should not be authenticated on forgot password
        $token = $this->tokenStorage->getToken();
        if (null !== $token && $token->getUser() instanceof UserInterface) {
            throw new AccessDeniedHttpException;
        }
    }

    public function onCreateToken(CreateTokenEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();


        $message = (new Email())
            ->from('no-reply@example.com')
            ->to($user->getEmail())
            ->subject('Reset your password')
            ->text('Reset your password by clicking on this link: https://' . $_ENV["SERVER_NAME"] . '/reset-password/' . $passwordToken->getToken());
        $this->mailer->send($message);
    }

    public function onUpdatePassword(UpdatePasswordEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();
        $user->setPassword($event->getPassword());
        $this->manager->persist($user);
        $this->manager->flush();
    }
}
