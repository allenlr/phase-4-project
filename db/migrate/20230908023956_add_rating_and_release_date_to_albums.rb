class AddRatingAndReleaseDateToAlbums < ActiveRecord::Migration[6.1]
  def change
    add_column :albums, :rating, :decimal
    add_column :albums, :release_date, :date
  end
end
