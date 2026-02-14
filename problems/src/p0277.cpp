#include <iostream>
#include <memory>

int main() {
    std::weak_ptr<int> w;

    {
        auto sp = std::make_shared<int>(1);
        w = sp;
        std::cout << w.expired();
    }

    std::cout << w.expired() << "\n";
}
