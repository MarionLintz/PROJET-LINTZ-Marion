<?php

namespace App\Models;

use Doctrine\ORM\Mapping as ORM;

/**
 * Produits
 *
 * @ORM\Table(name="produits")
 * @ORM\Entity
 */
class Produits
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=200, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="breed", type="string", length=200, nullable=false)
     */
    private $breed;

    /**
     * @var string
     *
     * @ORM\Column(name="gender", type="string", length=200, nullable=false)
     */
    private $gender;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="birth", type="date", nullable=false)
     */
    private $birth;

    /**
     * @var string
     *
     * @ORM\Column(name="color", type="string", length=200, nullable=false)
     */
    private $color;

    /**
     * @var string
     *
     * @ORM\Column(name="height", type="decimal", precision=10, scale=0, nullable=false)
     */
    private $height;

    /**
     * @var string
     *
     * @ORM\Column(name="weight", type="decimal", precision=10, scale=0, nullable=false)
     */
    private $weight;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=200, nullable=false)
     */
    private $description;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Produits
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set breed.
     *
     * @param string $breed
     *
     * @return Produits
     */
    public function setBreed($breed)
    {
        $this->breed = $breed;

        return $this;
    }

    /**
     * Get breed.
     *
     * @return string
     */
    public function getBreed()
    {
        return $this->breed;
    }

    /**
     * Set gender.
     *
     * @param string $gender
     *
     * @return Produits
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender.
     *
     * @return string
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set birth.
     *
     * @param \DateTime $birth
     *
     * @return Produits
     */
    public function setBirth($birth)
    {
        $this->birth = $birth;

        return $this;
    }

    /**
     * Get birth.
     *
     * @return \DateTime
     */
    public function getBirth()
    {
        return $this->birth;
    }

    /**
     * Set color.
     *
     * @param string $color
     *
     * @return Produits
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get color.
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set height.
     *
     * @param string $height
     *
     * @return Produits
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get height.
     *
     * @return string
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * Set weight.
     *
     * @param string $weight
     *
     * @return Produits
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * Get weight.
     *
     * @return string
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return Produits
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
}
