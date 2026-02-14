#include <iostream>
#include <memory>

struct S {
    int a = 1;
    int b = 2;
};

int main() {
    auto sp = std::make_shared<S>();

    std::shared_ptr<int> ap(sp, &sp->a);
    std::shared_ptr<int> bp(sp, &sp->b);

    std::cout << sp.use_count() << ' ' << ap.use_count() << ' ' << bp.use_count()
              << ' ' << *ap << *bp << "\n";

    sp.reset();

    std::cout << ap.use_count() << ' ' << bp.use_count() << "\n";
}
