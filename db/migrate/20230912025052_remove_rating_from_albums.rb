class RemoveRatingFromAlbums < ActiveRecord::Migration[6.1]
  def change
    remove_column :albums, :rating, :integer
  end
end
