#include <functional>
#include <memory>

int main() {
    auto p = std::make_unique<int>(1);
    std::function<void()> f = [q = std::move(p)]() { (void)q; };
    f();
}
