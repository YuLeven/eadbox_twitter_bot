const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/data/db.sqlite');

class LocalDB {

    /**
     * Persists new courses (unless they've been already stored)
     * @param {Array} courses - An Array of courses
     */
    static async persistCoursesIfInexists(courses) {
        return new Promise(async (resolve, reject) => {

            for (let course of courses) {
                let exists = await this.isCourseStored({
                    eadBoxID: course.course_id
                });
                
                // Skips this course if it was already stored
                if (exists === true) continue;
    
                let params = [
                    course.course_id,
                    course.title,
                    course.course_slug,
                    course.logo_url,
                ]
    
                db.run(`INSERT INTO published_courses(eadbox_course_id, title, course_slug, logo_url, published_at) VALUES (?, ?, ?, ?, ?);`, params, err => {
                    if (err) return reject(err);
                });
            }

            return resolve(true);
        });
    }

    /**
     * Retrieves all unpublished courses
     */
    static async getUnpublishedCourses() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM published_courses WHERE published_at IS NULL;', [], (err, rows) => {
                if (err) return reject(err);

                //Returns unpublished courses
                return resolve(rows);
            });
        });
    }

    /**
     * Marks a course as published on Twitter
     * @param {Number} id - The ID of the course to be marked as published
     */
    static async markCourseAsPublished(id) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE published_courses SET published_at = ? WHERE id = ?;`, [new Date(), id], err => {
                if (err) return reject(err);
                return resolve(true);
            });
        });
    }

    /**
     * Reverts a course publishment status
     * @param {Number} id - The ID of the course to be unmarked
     */
    static async markCourseAsUnpublished(id) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE published_courses SET published_at = NULL WHERE id = ?;`, [id], err => {
                if (err) return reject(err);
                return resolve(true);
            });
        });
    }

    /**
     * Determines if a course was published at Twitter
     * @param {String} eadBoxID - The ID which will be used to find the entry
     */
    static async isCourseStored({eadBoxID}) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM published_courses WHERE eadbox_course_id = ?;', [eadBoxID], (err, row) => {
                if (err) return reject(err);

                // Returns true if the course is already stored
                return resolve(row != null);
            });
        });
    }

    /**
     * Determines if a course was published at Twitter
     * @param {String} eadBoxID - The ID which will be used to find the entry
     */
    static async isCoursePublished({eadBoxID}) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM published_courses WHERE eadbox_course_id = ? AND published_at IS NOT NULL;', [eadBoxID], (err, row) => {
                if (err) return reject(err);

                // Returns true if the course is already stored
                return resolve(row != null);
            });
        });
    }

}

module.exports = LocalDB;