<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager, UserPasswordHasherInterface $passwordHasher): void
    {
//         $user = new User();
//         $user->setEmail("admin@admin.com");
//         $hashedPassword = $passwordHasher->hashPassword($user, "admin");
//         $user->setPassword($hashedPassword);
//         $manager->flush();
    }
}
