class AddImageUrlToAlbums < ActiveRecord::Migration[6.1]
  def change
    add_column :albums, :image_url, :string
  end
end
