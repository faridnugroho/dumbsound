package repositories

import (
	"dumbsound/models"

	"gorm.io/gorm"
)

type MusicRepository interface {
	FindMusics() ([]models.Music, error)
	GetMusic(ID int) (models.Music, error)
	CreateMusic(music models.Music) (models.Music, error)
	UpdateMusic(music models.Music) (models.Music, error)
	DeleteMusic(music models.Music) (models.Music, error)
}

func RepositoryMusic(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindMusics() ([]models.Music, error) {
	var musics []models.Music
	err := r.db.Preload("Artist").Find(&musics).Error

	return musics, err
}

func (r *repository) GetMusic(ID int) (models.Music, error) {
	var music models.Music
	err := r.db.Preload("Artist").First(&music, ID).Error

	return music, err
}

func (r *repository) CreateMusic(music models.Music) (models.Music, error) {
	err := r.db.Preload("Artist").Create(&music).Error

	return music, err
}

func (r *repository) UpdateMusic(music models.Music) (models.Music, error) {
	err := r.db.Preload("Artist").Save(&music).Error

	return music, err
}

func (r *repository) DeleteMusic(music models.Music) (models.Music, error) {
	err := r.db.Delete(&music).Error

	return music, err
}
