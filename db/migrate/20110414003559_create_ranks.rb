class CreateRanks < ActiveRecord::Migration
  def self.up
    create_table :ranks do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :score
      t.integer :time

      t.timestamps
    end
  end

  def self.down
    drop_table :ranks
  end
end
